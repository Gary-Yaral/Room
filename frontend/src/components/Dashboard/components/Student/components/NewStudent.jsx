import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { studentRoutes } from "../../../constants/routes";
import { messageSave } from "../../../utils/messageAlert";
import { CustomInput } from "../../commons/CustomInput";
import { CustomSelect } from "../../commons/CustomSelect";
import { defaultValues } from "../constants";

export const NewStudent = ({ courses, clicked, setClicked }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    messageSave({
      name: "Estudiante", 
      url: studentRoutes.STUDENT, 
      objectData: data, 
      reset: () => reset(defaultValues),
      refresh: () => {clicked ? setClicked(false) : setClicked(true)}
    })
  };

  return (
    <form className="multi-input" onSubmit={handleSubmit(onSubmit)}>
      <CustomSelect
        title={"Curso"}
        prop={["level", "parallel", "year"]}
        name={"course_id"}
        options={courses}
        register={register}
        errors={errors}
        letterA={false}
        isProp={true}
      />
      <CustomInput
        title="Identificación"
        name="dni"
        type="text"
        register={register}
        errors={errors}
        pattern={/^\d{10}$/}
        message="Indetificación debe tener 10 caracteres, letra o numeros."
      />
      <CustomInput
        title="Nombres"
        name="name"
        type="text"
        register={register}
        errors={errors}
        pattern={/^([a-z-A-ZáéíóúÁÉÍÓÚ]+)(\s{1}[a-z-A-ZáéíóúÁÉÍÓÚ]+)?$/}
        message="Ingrese una o dos palabras que contengan letras. No se permiten espacios en blanco al final."
      />
      <CustomInput
        title="Apellidos"
        name="lastname"
        type="text"
        register={register}
        errors={errors}
        pattern={/^([a-z-A-ZáéíóúÁÉÍÓÚ]+)(\s{1}[a-z-A-ZáéíóúÁÉÍÓÚ]+)?$/}
        message="Ingrese una o dos palabras que contengan letras. No se permiten espacios en blanco al final."
      />
      <div className="container-submit">
        <input type="submit" className="locked" value="Crear" />
      </div>
    </form>
  );
};
