import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import LocalBarOutlinedIcon from '@mui/icons-material/LocalBarOutlined';
import { Home } from '@mui/icons-material';
import { Approval } from '@mui/icons-material';
import { Chat } from '@mui/icons-material';
import { CalendarMonth } from '@mui/icons-material';
import { Storefront } from '@mui/icons-material';
import { PersonSearch } from '@mui/icons-material';
import { BarChart } from '@mui/icons-material';

const Menuitems = [
  {
    title: "홈",
    icon: Home,
    href:"/",
  },
  {
    title: "전자결재",
    icon: Approval,
    href: "/approval/draft",
  },
  {
    title: "일정 관리",
    icon: CalendarMonth,
    href: "/app/calendar",
  },
  {
    title: "가맹점 관리",
    icon: Storefront,
    href: "/franchisee",
  },
  {
    title: "인사 관리",
    icon: PersonSearch,
    href: "/app/employees",
  },
  {
    title: "매출 관리",
    icon: BarChart,
    href: "/sales",
  },
  {
    title: "메뉴 관리",
    icon: LocalDiningOutlinedIcon,

    href: "/menu",
  },
  {
    title: "주문 관리",
    icon: DescriptionOutlinedIcon,

    href: "/order",
  },
];

export default Menuitems;
