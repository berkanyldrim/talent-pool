import { GraphQLClient } from "graphql-request";

const API_URL = "https://staging-api.hrpanda.co/graphql";

// GraphQL Client
export const graphqlClient = new GraphQLClient(API_URL, {
  headers: {},
});

export const setAuthToken = (token: string) => {
  localStorage.setItem("auth_token", token);
  graphqlClient.setHeader("Authorization", `Bearer ${token}`);
};

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
  graphqlClient.setHeader("Authorization", "");
};

const token = getAuthToken();
if (token) {
  graphqlClient.setHeader("Authorization", `Bearer ${token}`);
}

export const LOGIN_MUTATION = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      type
      unlockAccountPath
      message
      success
      token
      user {
        ...UserFragment
        __typename
      }
      __typename
    }
  }

  fragment UserFragment on User {
    id
    createdAt
    updatedAt
    email
    firstName
    description
    lastName
    isAgreementChecked
    isActive
    profilePictureUrl
    dateOfBirth
    titleJob
    phoneNumber
    location
    role
    companyId
    company {
      id
      name
      logo
      companyEntegrations {
        id
        integration {
          type
          __typename
        }
        __typename
      }
      __typename
    }
    companyRole {
      permission {
        canDeleteApplicants
        canDeleteCompanyRoles
        canManageApplicants
        canManageCompanyRoles
        canViewAllApplicants
        canViewAllJobs
        canManageJobs
        canAssignMembersToApplicants
        canDeleteJobs
        canViewApplicantCommentsAndNotes
        canViewApplicantExpectedSalary
        canViewApplicantFormAnswers
        canViewApplicantLocation
        canViewApplicantPhoneNumber
        __typename
      }
      id
      name
      type
      __typename
    }
    userGroupId
    companyInviteCode
    onboardingStep
    isSSO
    isEmailActive
    __typename
  }
`;
