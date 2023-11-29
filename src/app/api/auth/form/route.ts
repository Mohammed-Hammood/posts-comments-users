import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";

export async function POST(request:NextRequest) {
    const data = await request.json();

    const scheme = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/),
        email: Joi.string().email(),
        message: Joi.string().allow('')
    });
    const validated = scheme.validate(data);
    
    if (validated.error) {
        return NextResponse.json({
            ok: false,
            message: 'Data is not valid',
            error: validated.error.details.map(x => x.message)
        })
    }


    return NextResponse.json({
        ok: true,
        error: validated.error,
        message: "Success",
        status: 200,
    })
}