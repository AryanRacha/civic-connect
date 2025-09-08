import dotenv from "dotenv";
dotenv.config();

export const role = {
  citizen: process.env.CITIZEN_ID,
  municipal_admin: process.env.MUNICIPAL_ADMIN_ID,
  field_officer: process.env.FIELD_OFFICER_ID,
};
