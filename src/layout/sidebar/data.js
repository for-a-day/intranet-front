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

const Menuitems = [
  {
    title: "홈",
    icon: DashboardOutlinedIcon,
    href:"/",
  },
  {
    title: "전자결재",
    icon: AddToPhotosOutlinedIcon,
    href: "/app/form-elements/autocomplete",
  },
  {
    title: "메신저",
    icon: AspectRatioOutlinedIcon,
    href: "/app/form-elements/button",
  },
  {
    title: "일정 관리",
    icon: AssignmentTurnedInOutlinedIcon,
    href: "/app/calendar",
  },
  {
    title: "가맹점 관리",
    icon: LocalBarOutlinedIcon,

    href: "/franchisee",
  },
  {
    title: "인사 관리",
    icon: SwitchCameraOutlinedIcon,
    href: "/app/employees",
  },
  {
    title: "결재 관리",
    icon: SwitchLeftOutlinedIcon,
    href: "/app/form-elements/switch",
  },
  {
    title: "매출 관리",
    icon: DescriptionOutlinedIcon,

    href: "/sales",
  },
  {
    title: "메뉴 관리",
    icon: LocalDiningOutlinedIcon,

    href: "/menu",
  },
  {
    title: "주문 관리",
    icon: AutoAwesomeMosaicOutlinedIcon,

    href: "/order",
  },
];

export default Menuitems;
