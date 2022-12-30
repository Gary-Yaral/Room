import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../commons/CustomInput";
import { CustomSelect } from "../../commons/CustomSelect";

export const NewStudent = ({ courses }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      dni: "",
      course_id: "",
      name: "",
      lastname: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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
