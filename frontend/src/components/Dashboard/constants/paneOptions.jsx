import { MdExitToApp } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import {
  AiFillHome,
  AiFillRobot,
  AiOutlineUsergroupAdd,
  AiFillFileText,
  AiFillSetting,
} from "react-icons/ai";
import { privateRoutes, publicRoutes } from "../../constants/router";

const buttons = [
  ["Inicio", <AiFillHome />, privateRoutes.INDEX],
  [
    "Escuela",
    <FaSchool />,
    [
      { text: "Información", url: privateRoutes.SCHOOL },
      { text: "Periodos", url: privateRoutes.PERIODS },
    ],
  ],
  ["Cursos", <AiFillRobot />, privateRoutes.COURSES],
  ["Alumnos", <AiOutlineUsergroupAdd />, privateRoutes.STUDENTS],
  [
    "Insumos",
    <AiFillFileText />,
    [
      { text: "Nuevo", url: privateRoutes.NEW_INPUT },
      { text: "Calificar", url: privateRoutes.QUALIFY },
      { text: "Ver todos", url: privateRoutes.ALL_INPUTS },
      { text: "Promedios", url: privateRoutes.AVERAGE },
    ],
  ],
  ["Configuración", <AiFillSetting />, privateRoutes.SETTINGS],
  ["Salir", <MdExitToApp />, publicRoutes.LOGIN],
];

export { buttons };
