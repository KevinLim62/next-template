import SingleListing from "./SingleListing";

type paramProps = {
  params: {
    id: string;
  };
};

const SingleListingPage = ({ params }: paramProps) => {
  return (
    <section className="container">
      <h1 className="font-bold text-3xl">Single Listing</h1>
      <SingleListing listingId={params.id} />
    </section>
  );
};

export default SingleListingPage;
