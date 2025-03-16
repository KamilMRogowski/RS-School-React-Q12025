import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormData, FormValidation } from '../utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { setFormData, setLocation } from '../store/slices/formDataSlice';
import { useNavigate } from 'react-router';
import convertToBase64 from '../utils/convertToBase64';
import calculatePasswordStrength from '../utils/calculatePasswordStrength';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function ReactHookForm() {
  const countries = useSelector((state: RootState) => state.countries);
  const [passwordStrength, setPasswordStrength] = useState('None');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormValidation),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const password = watch('passwordForm.password');

  useEffect(() => {
    if (password) {
      const strength = calculatePasswordStrength(password);
      setPasswordStrength(strength);
    }
  }, [password]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      let formDataToSave = { ...data };
      const base64Image = await convertToBase64(data.picture as File);
      formDataToSave = { ...formDataToSave, picture: base64Image };
      dispatch(setFormData(formDataToSave));
      dispatch(setLocation('React Hook Form'));
      void navigate('/');
    } catch (error) {
      console.error('Error processing form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>React Hook Form</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Basic Info</legend>
          <input {...register('name')} type="text" placeholder="Name" />
          <div className="error-container">
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <input {...register('age')} type="number" placeholder="Age" />
          <div className="error-container">
            {errors.age && <p className="error">{errors.age.message}</p>}
          </div>
          <input
            {...register('country')}
            type="search"
            placeholder="Select country"
            list="countries"
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <div className="error-container">
            {errors.country && (
              <p className="error">{errors.country.message}</p>
            )}
          </div>
          <fieldset>
            <legend>Gender</legend>
            <input
              {...register('gender')}
              name="gender"
              type="radio"
              value="male"
            />
            <label htmlFor="male">Male</label>
            <input
              {...register('gender')}
              name="gender"
              type="radio"
              value="female"
            />
            <label htmlFor="female">Female</label>
            <input
              {...register('gender')}
              name="gender"
              type="radio"
              value="other"
            />
            <label htmlFor="other">Other</label>
            <div className="error-container">
              {errors.gender && (
                <p className="error">{errors.gender.message}</p>
              )}
            </div>
          </fieldset>
        </fieldset>
        <fieldset>
          <legend>Email & Password</legend>
          <input {...register('email')} type="email" placeholder="Email" />
          <div className="error-container">
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <input
            {...register('passwordForm.password')}
            type="password"
            placeholder="Password"
          />
          <div className="error-container">
            {errors.passwordForm?.password && (
              <p className="error">{errors.passwordForm.password.message}</p>
            )}
            <p className="password-strength">
              Password Strength: {passwordStrength}
            </p>
          </div>
          <input
            {...register('passwordForm.confirmPassword')}
            type="password"
            placeholder="Confirm Password"
          />
          <div className="error-container">
            {errors.passwordForm?.confirmPassword && (
              <p className="error">
                {errors.passwordForm.confirmPassword.message}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Picture</legend>
          <input
            {...register('picture')}
            type="file"
            id="picture"
            accept="image/jpeg, image/png"
            size={1024}
          />
          <div className="error-container">
            {errors.picture && (
              <p className="error">{errors.picture.message}</p>
            )}
          </div>
        </fieldset>
        <fieldset>
          <input {...register('terms')} type="checkbox" id="terms" />
          <label htmlFor="terms">I agree to the terms and conditions</label>
          <div className="error-container">
            {errors.terms && <p className="error">{errors.terms.message}</p>}
          </div>
        </fieldset>
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
}
