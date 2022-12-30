import { useForm } from "react-hook-form";
import { messageUpdate } from "../../../utils/messageAlert";
import { urlPeriod } from "../../../constants/routes";
import { CustomSelect } from "../../commons/CustomSelect";
import { periods } from "../constants/years";
import { defaultValues } from "../constants";

export const PeriodUpdate = ({
  school,
  clicked,
  setClicked,
  setModal,
  values,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { period: values.period },
  });

  const hideModal = () => {
    setModal(false);
    reset(defaultValues);
  };

  const onSubmit = (data) => {
    let obj = {
      school_id: school.id,
      id: parseInt(values.id),
      year: data.period,
    };

    messageUpdate({
      url: urlPeriod,
      objectData: obj,
      name: "Periodo",
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
        <div className="form-title">Modificar periodo</div>
        <CustomSelect
          title={"Periodo"}
          prop={"year"}
          name={"period"}
          options={periods}
          register={register}
          errors={errors}
          letterA={false}
          isProp={false}
        />
        <input type="submit" className="locked" value="Modificar" />
      </form>
    </div>
  );
};
