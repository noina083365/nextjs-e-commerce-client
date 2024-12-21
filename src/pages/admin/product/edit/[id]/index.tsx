import AdminLayout from '@/components/admin/AdminLayout';
import EditProduct from '@/components/admin/product/edit';
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const cookies = context.req.headers.cookie;
  const customer = checkTokenExist(cookies);
  return {
    props: { id, userId: customer?.id || 0 }
  };
}

const AdminEditProduct = ({ id, userId }: any) => {
  return (
    <AdminLayout>
      <EditProduct id={id} userId={userId} />
    </AdminLayout>
  );
};

export default AdminEditProduct;
