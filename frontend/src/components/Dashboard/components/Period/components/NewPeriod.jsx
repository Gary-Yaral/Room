import { messageSave } from "../../../utils/messageAlert";
import { urlPeriod } from "../../../constants/routes";
import { periods } from "../constants/years";
import { CustomSelect } from "../../commons/CustomSelect";
import { useForm } from "react-hook-form";
import { defaultValues } from "../constants";


export const NewPeriod = ({ school, clicked, setClicked }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues
  });

  const onSubmit = (data) => {
    let obj = { year:data.period, school_id: school.id };

    messageSave({
      url: urlPeriod,
      objectData: obj,
      name: "Periodo",
      letterA: false,
      reset: () => reset(defaultValues),
      refresh: () => clicked ? setClicked(false) : setClicked(true),
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
      <input type="submit" className="locked" value="Crear" />
    </form>
  );
};
