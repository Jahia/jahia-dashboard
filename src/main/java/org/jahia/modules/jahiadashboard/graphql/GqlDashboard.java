package org.jahia.modules.jahiadashboard.graphql;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;
import org.jahia.data.templates.JahiaTemplatesPackage;
import org.jahia.data.templates.ModuleState;
import org.jahia.osgi.BundleUtils;
import org.jahia.services.templates.JahiaTemplateManagerService;
import org.jahia.services.templates.ModuleVersion;
import org.jahia.settings.SettingsBean;
import org.osgi.framework.Bundle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class GqlDashboard {

    private static final String DEFAULT_INSTALLATION_MODE = "trial";

    private static Logger logger = LoggerFactory.getLogger(GqlDashboard.class);

    JahiaTemplateManagerService jahiaTemplateManagerService = BundleUtils.getOsgiService(JahiaTemplateManagerService.class, null);

    @GraphQLField
    @GraphQLDescription("The Jahia operating mode (development/production/distantPublicationServer")
    public String getOperatingMode() {
        return SettingsBean.getInstance().getOperatingMode();
    }

    @GraphQLField
    @GraphQLDescription("The Jahia custom installation mode (production/trial,...)")
    public String getInstallationMode() {
        String installationMode = SettingsBean.getInstance().getPropertiesFile().getProperty("installationMode");
        if (installationMode == null) {
            installationMode = DEFAULT_INSTALLATION_MODE;
        }
        return installationMode;
    }

    @GraphQLField
    @GraphQLDescription("Retrieves the list of modules currently in development in the Studio")
    public List<GqlModule> getMyModules() {
        Map<Bundle, ModuleState> moduleStatesByBundle = jahiaTemplateManagerService.getModuleStates();
        List<GqlModule> myModules = new ArrayList<>();
        for (Bundle bundle : moduleStatesByBundle.keySet()) {
            JahiaTemplatesPackage jahiaModule = BundleUtils.getModule(bundle);
            if (jahiaModule.getSourcesFolder() != null) {
                myModules.add(new GqlModule(jahiaModule.getId(), jahiaModule.getName(), jahiaModule.getDescription(), jahiaModule.getVersion().toString()));
            }
        }
        return myModules;
    }

}
