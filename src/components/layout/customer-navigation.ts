import { customerHiddenNavigation, customerMainNavigation, customerOtherNavigation, customerRequestsNavigation } from "@/components/layout/app-sidebar-navigation";

type AllowedSectionsOptions = {
  showRequestsNav?: boolean;
};

export function getCustomerAllowedSections(options?: AllowedSectionsOptions) {
  const sections = [...customerMainNavigation];

  if (options?.showRequestsNav) {
    sections.push(...customerRequestsNavigation);
  }

  return [...sections, ...customerOtherNavigation, ...customerHiddenNavigation];
}

export function getCustomerSectionLabel(section: string) {
  if (section === "Dashboard") {
    return "Home";
  }

  return section;
}

export function getCustomerBreadcrumb(section: string) {
  const { parent, current } = getCustomerBreadcrumbParts(section);

  if (!parent) {
    return current;
  }

  return `${parent} / ${current}`;
}

export function getCustomerBreadcrumbParts(section: string) {
  if (section === "Dashboard") {
    return { parent: null, current: "Home" };
  }

  if (section === "Business Profile Requests") {
    return { parent: "Home", current: "Business Profile Requests" };
  }

  if (section === "New Business Profile Request") {
    return { parent: "Home", current: "Request Business Profile" };
  }

  if (section === "Payment Setup") {
    return { parent: "Home", current: "Payment Setup" };
  }

  return { parent: "Home", current: getCustomerSectionLabel(section) };
}
