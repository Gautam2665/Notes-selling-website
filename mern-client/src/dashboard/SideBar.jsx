import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from "react-router-dom";
import userImg from "../assets/profile.jpg"

const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar navigation">
        <Sidebar.Logo
        href="#"
        img={userImg}
        imgAlt="Flowbite logo"
       >
        <p>Flowbite</p>
       </Sidebar.Logo>

      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
            Upload Notes
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/dashboard/manage" icon={HiInbox}>
            Manage Notes
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/products" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/login" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/upgrade" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/documentation" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/help" icon={HiSupport}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;