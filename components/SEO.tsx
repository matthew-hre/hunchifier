import Head from "next/head";

const SEO = ({
  pageTitle,
  pageDescription,
}: {
  pageTitle: string;
  pageDescription: string;
}) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </Head>
  );
};

export default SEO;
