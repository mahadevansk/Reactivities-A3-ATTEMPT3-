using System;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);

        }

        catch (Exception ex)
        {
            
        }
    }
    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validtionError = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validtionError.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validtionError[error.PropertyName] = [.. existingErrors, error.PropertyName];
                }
                else
                {
                    validtionError[error.PropertyName] = [error.ErrorMessage]; // collection expression
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validatonProblemDetails = new ValidationProblemDetails(validtionError)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more Validation erros has occured"


        };

        await context.Response.WriteAsJsonAsync(validatonProblemDetails);



    }
}
