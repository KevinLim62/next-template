import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./Columns";
import { fetchData } from "./actions";
import ProtectedPage from "@/components/shared/ProtectedPage";

type paramProps = {
  searchParams?: { [key: string]: string | undefined };
};

const TableTemplatePage = async ({ searchParams }: paramProps) => {
  const data = await fetchData({
    pageIndex: searchParams?.page ? Number(searchParams?.page) : 1,
    pageSize: searchParams?.limit ? Number(searchParams?.limit) : 10,
  });

  return (
    <ProtectedPage>
      <section className="container">
        <h1 className="font-bold text-3xl">Datatable Template</h1>
        <DataTable columns={columns} data={data} />
      </section>
    </ProtectedPage>
  );
};

export default TableTemplatePage;
