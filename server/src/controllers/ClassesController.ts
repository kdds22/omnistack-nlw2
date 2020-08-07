import { Request, Response } from "express";

import db from "../database/connections";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: "Falta filtros para pesquisa",
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db("classes")
      .where("classes.subject", "=", subject)
      .join("users", "id", "=", "classes.user_id")
      .join("class_schedule", "class_id", "=", "classes.id")
      .where("class_schedule.from", ">=", timeInMinutes)
      .where("class_schedule.to", "<=", timeInMinutes);

    console.log(classes);

    return response.status(200).json({ Success: classes.toString() });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersId = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersId[0];

      const insertedClassId = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassId[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: "Erro inesperado na criação de classes",
      });
    }
  }
}
