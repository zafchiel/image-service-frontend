import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { authSchema } from "../../lib/auth-schema.js";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ url }) => {
	return {
		form: await superValidate(zod(authSchema)),
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(authSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		return {
			form,
		};
	},
};
