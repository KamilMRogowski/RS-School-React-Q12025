import { FormEvent, useRef, useState } from 'react';
import { FormValidation } from '../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setLocation } from '../store/slices/formDataSlice';
import { useNavigate } from 'react-router';
import convertToBase64 from '../utils/convertToBase64';
import calculatePasswordStrength from '../utils/calculatePasswordStrength';
import { RootState } from '../store/store';

export default function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.countries);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState('None');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLFieldSetElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value;
    if (password) {
      const strength = calculatePasswordStrength(password);
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      country: countryRef.current?.value,
      gender:
        genderRef.current?.querySelector<HTMLInputElement>('input:checked')
          ?.value,
      email: emailRef.current?.value,
      passwordForm: {
        password: passwordRef.current?.value,
        confirmPassword: confirmPasswordRef.current?.value,
      },
      picture: pictureRef.current?.files,
      terms: termsRef.current?.checked,
    };

    const validatedData = FormValidation.safeParse(formData);

    if (!validatedData.success) {
      const newErrors: Record<string, string> = {};
      validatedData.error.issues.forEach((issue) => {
        newErrors[issue.path.join('.')] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      let formDataToSave = validatedData.data;

      if (pictureRef.current?.files?.[0]) {
        const base64Image = await convertToBase64(pictureRef.current.files[0]);
        formDataToSave = { ...formDataToSave, picture: base64Image };
      }

      dispatch(setFormData(formDataToSave));
      dispatch(setLocation('Uncontrolled Form'));
      void navigate('/');
    } catch (error) {
      console.error('Error processing form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Uncontrolled Form</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Basic Info</legend>
          <input ref={nameRef} type="text" placeholder="Name" />
          <div className="error-container">
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <input ref={ageRef} type="number" placeholder="Age" />
          <div className="error-container">
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          <input
            ref={countryRef}
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
            {errors.country && <p className="error">{errors.country}</p>}
          </div>

          <fieldset ref={genderRef}>
            <legend>Gender</legend>
            <input name="gender" type="radio" value="male" id="male" />
            <label htmlFor="male">Male</label>
            <input name="gender" type="radio" value="female" id="female" />
            <label htmlFor="female">Female</label>
            <input name="gender" type="radio" value="other" id="other" />
            <label htmlFor="other">Other</label>
            <div className="error-container">
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>
          </fieldset>
        </fieldset>

        <fieldset>
          <legend>Email & Password</legend>
          <input ref={emailRef} type="email" placeholder="Email" />
          <div className="error-container">
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <div className="error-container">
            {errors['passwordForm.password'] && (
              <p className="error">{errors['passwordForm.password']}</p>
            )}
            <p className="password-strength">
              Password Strength: {passwordStrength}
            </p>
          </div>

          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
          />
          <div className="error-container">
            {errors['passwordForm.confirmPassword'] && (
              <p className="error">{errors['passwordForm.confirmPassword']}</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Picture</legend>
          <input ref={pictureRef} type="file" accept="image/jpeg, image/png" />
          <div className="error-container">
            {errors.picture && <p className="error">{errors.picture}</p>}
          </div>
        </fieldset>

        <fieldset>
          <input ref={termsRef} type="checkbox" id="terms" />
          <label htmlFor="terms">I agree to the terms and conditions</label>
          <div className="error-container">
            {errors.terms && <p className="error">{errors.terms}</p>}
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
