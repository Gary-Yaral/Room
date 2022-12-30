import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const SchoolInfo = ({ school, locked, setLocked }) => {
  const {
    info: { teacher },
  } = useSelector(({ logged }) => logged);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset(formValues => ({
      ...formValues,
      ...school,
    }))
    setLocked(true)
  }, [school])

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="multi-input" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="hidden"
        {...register("id", {
          required: true,
        })}
      />
      <div className="container-input">
        <label htmlFor="name">Nombre</label>
        <input
          className="custom-input"
          type="text"
          disabled = {locked}
          {...register("name", {
            required: true,
          })}

        />
      </div>
      <div className="container-input">
        <label htmlFor="address">Dirección</label>
        <input
          className="custom-input"
          disabled = {locked}
          type="text"
          {...register("address", {
            required: true,
          })}
        />
      </div>
      <div className="container-input">
        <label htmlFor="code">Código</label>
        <input
          className="custom-input"
          disabled = {locked}
          type="text"
          {...register("code", {
            required: true,
          })}
        />
      </div>
      <div className="container-input">
        <label htmlFor="telephone">Telefono</label>
        <input
          className="custom-input"
          type="text"
          disabled = {locked}
          {...register("telephone", {
            required: true,
          })}
        />
      </div>
      {
        locked && (<div className="container-submit">
          <div
            className="locked"
            type="submit"
            value="Actualizar"
            onClick={() => setLocked(false)}
          >Actualizar</div>
        </div>)
      } 
      { !locked && (
        <>
          <div className="container-submit">
            <input className="locked" type="submit" value="Guardar" />
          </div>
          <div className="container-submit">
            <input
              className="btn-cancel"
              type="submit"
              value="Cancelar"
              onClick={() => setLocked(true)}
            />
          </div>
        </>
      )}
    </form>
  );
};
