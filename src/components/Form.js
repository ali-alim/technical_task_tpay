import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {format} from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let USER_EXISTS = false;

var today = new Date();


const Form = ({ usersInfo, setUsersInfo }) => {
  const navigate = useNavigate();
  const userExists = (e) => {
    usersInfo.map((user) => 
      {if (user.პირადი_ნომერი === e.target.value) USER_EXISTS = true;
      else USER_EXISTS = false;}
    );
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    const formattedDate = format(new Date(დაბადების_თარიღი), "dd/MM/yyyy");
    დაბადების_თარიღი = formattedDate;

    const newList = {
      სახელი,
      გვარი,
      პირადი_ნომერი,
      სქესი,
      დაბადების_თარიღი,
      დაბადების_ადგილი,
      მისამართი,
    };
    setUsersInfo([...usersInfo, newList]);

    navigate("/");
  };

  const სახელი = watch("სახელი");
  const გვარი = watch("გვარი");
  const პირადი_ნომერი = watch("პირადი_ნომერი");
  const სქესი = watch("სქესი");
  let დაბადების_თარიღი = watch("დაბადების_თარიღი");
  const დაბადების_ადგილი = watch("დაბადების_ადგილი");
  const მისამართი = watch("მისამართი");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>ახალი ჩანაწერის დამატება</h1>
        <input
          placeholder="სახელი"
          {...register("სახელი", { required: true })}
        />
        {errors.სახელი && <strong>&nbsp; * სავალდებულო ველი</strong>}
        <input placeholder="გვარი" {...register("გვარი", { required: true })} />
        {errors.გვარი && <strong>&nbsp; * სავალდებულო ველი</strong>}
        {USER_EXISTS === false ? (
          <div>
            <input
              placeholder="პირადი ნომერი"
              {...register(
                "პირადი_ნომერი",

                {
                  required: true,
                  minLength: 11,
                  onChange: (e) => userExists(e),
                }
              )}
            />
            {errors.პირადი_ნომერი && <strong>მინიმუმ 11 სიმბოლო</strong>}
          </div>
        ) : (
          <div>
            <input
              placeholder="პირადი ნომერი"
              {...register(
                "პირადი_ნომერი",
                {
                  onChange: (e) => userExists(e),
                },
                { required: true, minLength: 11 }
              )}
            />
            <span>
              <strong>
                &nbsp;* მომხმარებელი ასეთი პირადი ნომრით უკვე დამატებულია
              </strong>{" "}
            </span>
          </div>
        )}
        <select {...register("სქესი", { required: true })}>
          <option value="">სქესი</option>
          <option value="მამრობითი">მამრობითი</option>
          <option value="მდედრობითი">მდედრობითი</option>
        </select>
        {errors.სქესი && <strong>&nbsp; * სავალდებულო ველი</strong>}
        <div className="date_field">
         
    <Controller
        control={control}
        name="დაბადების_თარიღი"
        render={({ field }) => (
          <DatePicker
          maxDate={today}
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />

          {errors.დაბადების_თარიღი && (
            <strong>&nbsp; * სავალდებულო ველი</strong>
          )}
        </div>
        <input
          placeholder="დაბადების_ადგილი"
          {...register("დაბადების_ადგილი", { required: true })}
        />
        {errors.დაბადების_ადგილი && <strong>&nbsp; * სავალდებულო ველი</strong>}{" "}
        <input
          placeholder="მისამართი"
          {...register("მისამართი", { required: true })}
        />
        {errors.მისამართი && <strong>&nbsp; * სავალდებულო ველი</strong>}
        <br />
        <input disabled={USER_EXISTS} type="submit" value="შენახვა" />
      </form>
    </>
  );
};

export default Form;
