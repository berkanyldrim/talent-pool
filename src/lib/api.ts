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

export const GET_COMPANY_APPLICANT_LIST = `
  query getCompanyApplicantList($page: Int!, $pageSize: Int, $filter: ApplicantListFilter, $sort: ApplicantListSort) {
    getCompanyApplicantList(
      page: $page
      pageSize: $pageSize
      filter: $filter
      sort: $sort
    ) {
      applicants {
        ...CoreTalentFragment
        email
        phoneNumber
        address
        latitude
        age
        longitude
        country
        gender
        dateOfBirth
        gradUni
        university {
          id
          name
          __typename
        }
        universityName
        salaryExp
        salaryExp2
        salaryExpCurr
        salaryExpPeriod
        sourceLink
        sourceType
        sourceUpdatedAt
        updatedAt
        myPermission {
          id
          canViewApplicantPhoneNumber
          canViewApplicantLocation
          canViewApplicantFormAnswers
          canViewApplicantExpectedSalary
          canDeleteApplicants
          canAssignMembersToApplicants
          __typename
        }
        createdAt
        isViewedByMe
        tags {
          id
          name
          color
          __typename
        }
        skills {
          id
          name
          color
          __typename
        }
        __typename
      }
      total
      pages
      __typename
    }
  }

  fragment CoreTalentFragment on ApplicantWithActiveApplication {
    ...CoreTalentFragmentWithoutLastApp
    collaborators {
      assignees {
        id
        user {
          id
          firstName
          lastName
          profilePictureUrl
          email
          __typename
        }
        __typename
      }
      autoAssignees {
        id
        firstName
        lastName
        phoneNumber
        email
        __typename
      }
      __typename
    }
    activeApplication {
      id
      createdAt
      updatedAt
      aiFit
      score
      salaryExp
      salaryExpCurr
      salaryExpPeriod
      lexorank
      resume {
        id
        name
        url
        size
        pageCount
        uploadedAt
        __typename
      }
      jobListing {
        id
        name
        color
        type
        collaborators {
          autoAssignees {
            id
            firstName
            lastName
            email
            profilePictureUrl
            __typename
          }
          __typename
        }
        __typename
      }
      stage {
        id
        name
        __typename
      }
      applicant {
        id
        firstName
        lastName
        profilePhotoUrl
        email
        __typename
      }
      rejectedReasons {
        id
        name
        __typename
      }
      __typename
    }
    __typename
  }

  fragment CoreTalentFragmentWithoutLastApp on ApplicantWithActiveApplication {
    id
    firstName
    lastName
    rating
    isFavoritedByMe
    profilePhotoUrl
    __typename
  }
`;

export interface ApplicantListFilter {
  filterParameters?: Array<{
    name: string;
    operator: string;
    filterVariable: string;
    logicalOperator: string;
  }>;
  query?: string;
  isFavoriteApplicant?: boolean;
  jobListingId?: string | null;
}

export interface ApplicantListSort {
  [key: string]: "asc" | "desc";
}

export interface ApplicantListVariables {
  page: number;
  pageSize: number;
  filter?: ApplicantListFilter;
  sort?: ApplicantListSort;
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePhotoUrl?: string;
  rating?: number;
  isFavoritedByMe?: boolean;
  sourceType?: string;
  createdAt: string;
  activeApplication?: {
    id: string;
    aiFit?: number;
    resume?: {
      id: string;
      url: string;
    };
    stage?: {
      id: string;
      name: string;
    };
    jobListing?: {
      id: string;
      name: string;
      color?: string;
    };
  };
}

export interface ApplicantListResponse {
  getCompanyApplicantList: {
    applicants: Applicant[];
    total: number;
    pages: number;
  };
}
