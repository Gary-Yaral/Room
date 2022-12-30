import { useForm } from "react-hook-form";
import { messageUpdate } from "../../../utils/messageAlert";
import { courseRoutes } from "../../../constants/routes";
import { CustomSelect } from "../../commons/CustomSelect";
import { InputSpecialty } from "../../commons/InputSpecialty";
import { defaultValues } from "../constants";

export const CourseUpdate = ({
  schoolData,
  clicked,
  setClicked,
  setModal,
  selected
}) => {
  const { levels, parallels, periods } = schoolData;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: selected,
  });

  const hideModal = () => {
    setModal(false);
    reset(defaultValues);
  };

  const onSubmit = (data) => {
    let speciality = data.speciality
    if(speciality.length > 0) {
      speciality = data.speciality
      .split(" ")
      .filter((text) => text !== "")
      .join(" ");
    }

    let obj = { ...data, speciality };

    messageUpdate({
      url: courseRoutes.COURSE,
      objectData: obj,
      name: "Curso",
      letterA: false,
      reset: hideModal,
      refresh: () => (clicked ? setClicked(false) : setClicked(true)),
    });
  };

  const handleClick = (e) => {
    const { className } = e.target;
    if (className === "modal") {
      hideModal();
    }
  };
  return (
    <div className="modal" onClick={handleClick}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-title">Modificar curso</div>
        <CustomSelect
          title={"Periodo"}
          prop={"year"}
          name={"period"}
          options={periods}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <CustomSelect
          title={"Nivel"}
          prop={"name"}
          name={"level"}
          options={levels}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <CustomSelect
          title={"Paralelo"}
          prop={"name"}
          name={"parallel"}
          options={parallels}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <InputSpecialty name="speciality" register={register} errors={errors}/>
        <input type="submit" className="locked" value="Modificar" />
      </form>
    </div>
  );
};
