import * as v from "valibot";

export const LoginSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty("Please enter an email"),
		v.email("Please enter a valid email"),
	),
	password: v.pipe(
		v.string(),
		v.nonEmpty("Please enter a password"),
		v.minLength(6, "Password must be at least 6 characters"),
	),
});

export const RegisterSchema = v.pipe(
	v.object({
		email: v.pipe(v.string(), v.email()),
		username: v.pipe(
			v.string(),
			v.nonEmpty("Please enter a username"),
			v.minLength(3, "Username must be at least 3 characters"),
			v.maxLength(20, "Username must be at most 20 characters"),
		),
		password: v.pipe(
			v.string(),
			v.nonEmpty("Please enter a password"),
			v.minLength(6, "Password must be at least 6 characters"),
		),
		repeatPassword: v.string(),
		// tos: v.literal(true, "Acceptance is mandatory"),
	}),
	v.forward(
		v.partialCheck(
			[["password"], ["repeatPassword"]],
			(input) => input.password === input.repeatPassword,
			"Passwords must match",
		),
		["repeatPassword"],
	),
);
