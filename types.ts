export type IUser = {
  pk: string;
  sk: string;
  email: string;
  createdAt: string;
  plan: "FREE" | "PRO" | "PREMIUM";
  buttonClicks: number;
  subscriptionStatus?: string;
  stripeCustomerId: string;
};

export type IPlan = {
  TIER: "FREE" | "PRO" | "PREMIUM";
  LIMITATIONS: {
    BUTTON_CLICKS: number;
  };
  PRODUCT_ID?: string;
  PLAN_ID?: string;
};
