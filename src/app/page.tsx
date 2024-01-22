'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, mappedPlans } from '../schemas/user.schema'


// * useForm: Crea la propiedad name, onchange, value, type, placeholder

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(userSchema)
  })

  const plansOpts = Object.entries(mappedPlans).map(([key, value]) => {
    //console.log(key, value)
    return (
      <option key={key} value={key}>{value}</option>
    )
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); // * Ahora cuando llama data tiene el autocompletado
  }

  console.log(errors);
  //* onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault()}
  return (
    <main className="bg-slate-300 h-screen">
      <h1 className="text-center text-6xl pt-8 underline">Formulario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col w-screen p-4 bg-slate-700 text-white border border-blue-300">
        <label htmlFor="name">Name :</label>
        <input type="text" id="name" {...register('name')} />
        {errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" autoComplete="off" {...register('email')} />
        {errors.email?.message && <span className="text-red-500">{errors.email?.message}</span>}

        <label htmlFor="password">Password :</label>
        <input type="password" id="password" autoComplete="off" {...register('password')} />
        {errors.password?.message && <span className="text-red-500">{errors.password?.message}</span>}

        <label htmlFor="confirmPassword">Confirm Password :</label>
        <input type="password" id="confirmPassword" {...register('confirmPassword')} />
        {errors.confirmPassword?.message && <span className="text-red-500">{errors.confirmPassword?.message}</span>}

        <label htmlFor="date">Date</label>
        <input type="date" id="date" {...register('date')} />
        {errors.date?.message && <span className="text-red-500">{errors.date?.message}</span>}

        <label htmlFor="weight">Weight :</label>
        <input type="number" id="weight" {...register('weight')} />
        {errors.weight?.message && <span className="text-red-500">{errors.weight?.message}</span>}

        <label htmlFor="plan">Plan :</label>
        <select className="bg-slate-400 w-[60%] text-green-400" id="plan" {...register('plan')}>
          {plansOpts}
        </select>
        {errors.plan?.message && <span className="text-red-500">{errors.plan?.message}</span>}

        <button className="bg-blue-400 text-white px-2 w-[50%] self-center mt-4" type="submit" >Submit</button>
      </form>
      <div>
        {JSON.stringify(watch(), null, 2)}
      </div>
    </main>
  );
}
