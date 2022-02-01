package org.jahia.modules.jahiadashboard.graphql;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLName;
import graphql.annotations.annotationTypes.GraphQLNonNull;
import org.jahia.data.templates.JahiaTemplatesPackage;
import org.jahia.data.templates.ModuleState;
import org.jahia.modules.graphql.provider.dxm.osgi.annotations.GraphQLOsgiService;
import org.jahia.osgi.BundleUtils;
import org.jahia.services.content.JCRSessionWrapper;
import org.jahia.services.content.JCRTemplate;
import org.jahia.services.modulemanager.DefinitionsManagerService;
import org.jahia.services.templates.JahiaTemplateManagerService;
import org.jahia.services.usermanager.JahiaUserManagerService;
import org.jahia.settings.SettingsBean;
import org.osgi.framework.Bundle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.jcr.RepositoryException;
import java.io.IOException;
import java.util.*;

public class GqlDashboard {

    @Inject
    @GraphQLOsgiService
    private JCRTemplate jcrTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(GqlDashboard.class);

    JahiaTemplateManagerService jahiaTemplateManagerService = BundleUtils.getOsgiService(JahiaTemplateManagerService.class, null);

    @Inject @GraphQLOsgiService
    private DefinitionsManagerService defManagerService;

    @GraphQLField
    @GraphQLDescription("Whether the tools are accessible on the installation")
    public boolean getToolsAccess() {
        String hasToolsAccessStr = SettingsBean.getInstance().getPropertiesFile().getProperty("toolsAccess");
        if (hasToolsAccessStr == null) {
            return true;
        }
        return Boolean.getBoolean(hasToolsAccessStr);
    }

    @GraphQLField
    @GraphQLDescription("Retrieves the list of modules currently available on the platform")
    public List<GqlModule> getModules() {
        try {
            JCRSessionWrapper session = jcrTemplate.getSessionFactory().getCurrentUserSession();
            if (session == null || JahiaUserManagerService.isGuest(session.getUser())) {
                return Collections.emptyList();
            }
        } catch (RepositoryException e) {
            LOGGER.error("Encountered Repository Exception:", e);
        }
        Map<Bundle, ModuleState> moduleStatesByBundle = jahiaTemplateManagerService.getModuleStates();
        List<GqlModule> modules = new ArrayList<>();
        for (Map.Entry<Bundle, ModuleState> moduleState : moduleStatesByBundle.entrySet()) {
            if (moduleState.getValue().getState() != ModuleState.State.STARTED) {
                continue;
            }
            JahiaTemplatesPackage jahiaModule = BundleUtils.getModule(moduleState.getKey());
            boolean inDevelopment = false;
            if (jahiaModule.getSourcesFolder() != null) {
                inDevelopment = true;
            }
            modules.add(new GqlModule(jahiaModule.getId(), jahiaModule.getName(), jahiaModule.getDescription(), jahiaModule.getVersion().toString(), jahiaModule.getBundle().getLastModified(), inDevelopment));
        }
        modules.sort((o1, o2) -> Long.compare(o2.getLastModified(), o1.getLastModified()));
        return modules;
    }

    @GraphQLField
    @GraphQLDescription("check if current active module is compatible with latest registered CND definition")
    public boolean checkModuleDefinition(
            @GraphQLName("moduleId") @GraphQLDescription("Current active module Id to check") @GraphQLNonNull String moduleId)
            throws IOException, RepositoryException {

        return defManagerService.isLatest(moduleId) ||
                defManagerService.checkDefinition(moduleId) == DefinitionsManagerService.CND_STATUS.OK;
    }
}

