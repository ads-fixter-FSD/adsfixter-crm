import {
  customerHiddenNavigation,
  customerMainNavigation,
  customerOtherNavigation,
} from "@/components/layout/app-sidebar-navigation";

type AllowedSectionsOptions = {
  requestItems?: string[];
};

export function getCustomerAllowedSections(options?: AllowedSectionsOptions) {
  const sections = [...customerMainNavigation];

  if (options?.requestItems?.length) {
    sections.push(...options.requestItems);
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

  if (section === "Request Account") {
    return { parent: "Home", current: "Request Ad Account" };
  }

  if (section === "Ad Account Requests") {
    return { parent: "Home", current: "Ad Account Requests" };
  }

  if (section === "Setup Complete") {
    return { parent: "Home", current: "All Set" };
  }

  return { parent: "Home", current: getCustomerSectionLabel(section) };
}
