import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

const Menuitems = [
  {
    title: "홈",
    icon: DashboardOutlinedIcon,
    href: "/app/home",
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
    href: "/app/form-elements/checkbox",
  },
  {
    title: "가맹점 관리",
    icon: AlbumOutlinedIcon,
    href: "/app/form-elements/radio",
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
    title: "Form",
    icon: DescriptionOutlinedIcon,
    href: "/app/form-layouts/form-layouts",
  },
  {
    title: "Table",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/app/tables/basic-table",
  },
];

export default Menuitems;
