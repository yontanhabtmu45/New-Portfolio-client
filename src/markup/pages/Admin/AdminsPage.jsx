// Import the AdminList component
import AdminList from '../../components/Admin/AdminList/AdminList';
// Import the AdminMenu component
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function AdminsPage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AdminList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminsPage;