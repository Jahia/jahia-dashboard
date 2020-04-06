package org.jahia.modules.jahiadashboard.graphql;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLName;
import graphql.annotations.annotationTypes.GraphQLTypeExtension;
import org.jahia.modules.graphql.provider.dxm.DXGraphQLProvider;

/**
 * This extension to the Query is where the content editor GraphQL form API is made available
 */
@GraphQLTypeExtension(DXGraphQLProvider.Query.class)
public class QueryExtensions {

    @GraphQLField
    @GraphQLName("dashboard")
    @GraphQLDescription("Main access field to the DX GraphQL Dashboard API")
    public static GqlDashboard getDashboard() {
        return new GqlDashboard();
    }

}
