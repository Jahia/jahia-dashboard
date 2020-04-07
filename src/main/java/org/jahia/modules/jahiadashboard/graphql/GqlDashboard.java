package org.jahia.modules.jahiadashboard.graphql;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;
import org.jahia.data.templates.JahiaTemplatesPackage;
import org.jahia.data.templates.ModuleState;
import org.jahia.osgi.BundleUtils;
import org.jahia.services.templates.JahiaTemplateManagerService;
import org.jahia.settings.SettingsBean;
import org.osgi.framework.Bundle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class GqlDashboard {

    private static Logger logger = LoggerFactory.getLogger(GqlDashboard.class);

    JahiaTemplateManagerService jahiaTemplateManagerService = BundleUtils.getOsgiService(JahiaTemplateManagerService.class, null);

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
        modules.sort(new Comparator<GqlModule>() {
            @Override
            public int compare(GqlModule o1, GqlModule o2) {
                if (o1.getLastModified() < o2.getLastModified()) {
                    return 1;
                }
                if (o1.getLastModified() > o2.getLastModified()) {
                    return -1;
                }
                return 0;
            }
        });
        return modules;
    }

}
