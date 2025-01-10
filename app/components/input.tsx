import classNames from 'classnames';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Input({
  className,
  label,
  error,
  ...props
}: ComponentProps<'input'> & { label?: string; error?: string }) {
  return (
    <label className="flex flex-col group" aria-label="Name">
      <div className="flex justify-between">
        {label ? <span>{label}</span> : null}

        {error ? (
          <span
            className={classNames(
              'font-bold text-red-500 group-has-[:user-invalid]:block',
              {
                hidden: !error,
              }
            )}
          >
            {error ?? 'This field is required'}
          </span>
        ) : null}
      </div>

      <input
        className={twMerge(
          'border-[#e5e2ef] focus:outline-violet-700 border-solid border-2 rounded-md py-1',
          className
        )}
        {...props}
      />
    </label>
  );
}