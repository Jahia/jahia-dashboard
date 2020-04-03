package org.jahia.modules.jahiadashboard.graphql;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;

public class GqlModule {

    private String id;
    private String name;
    private String description;
    private String version;
    private long lastModified;

    public GqlModule() {
    }

    public GqlModule(String id, String name, String description, String version, long lastModified) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.version = version;
        this.lastModified = lastModified;
    }

    @GraphQLField
    @GraphQLDescription("Unique identifier for the module")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @GraphQLField
    @GraphQLDescription("User facing name for the module")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @GraphQLField
    @GraphQLDescription("User facing description for the module")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @GraphQLField
    @GraphQLDescription("Version number for the module")
    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    @GraphQLField
    @GraphQLDescription("Bundle last modification date")
    public long getLastModified() {
        return lastModified;
    }

    public void setLastModified(long lastModified) {
        this.lastModified = lastModified;
    }
}
