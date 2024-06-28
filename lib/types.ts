export type NavItems = {
  title: string;
  href: string;
  description: string;
  className?: string;
};

export type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};

export type Skeleton = {
  size: number;
};
