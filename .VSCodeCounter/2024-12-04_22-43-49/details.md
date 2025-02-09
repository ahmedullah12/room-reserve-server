# Details

Date : 2024-12-04 22:43:49

Directory c:\\projects\\level 2\\room-reserve-server

Total : 121 files,  4759 codes, 253 comments, 528 blanks, all 5540 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.prettierrc.json](/.prettierrc.json) | JSON | 4 | 0 | 0 | 4 |
| [README.md](/README.md) | Markdown | 33 | 0 | 16 | 49 |
| [dist/app.js](/dist/app.js) | JavaScript | 31 | 1 | 1 | 33 |
| [dist/app/builder/QueryBuilder.js](/dist/app/builder/QueryBuilder.js) | JavaScript | 92 | 0 | 1 | 93 |
| [dist/app/config/index.js](/dist/app/config/index.js) | JavaScript | 21 | 0 | 1 | 22 |
| [dist/app/error/AppError.js](/dist/app/error/AppError.js) | JavaScript | 16 | 0 | 1 | 17 |
| [dist/app/error/handleCastError.js](/dist/app/error/handleCastError.js) | JavaScript | 15 | 0 | 1 | 16 |
| [dist/app/error/handleDuplicateError.js](/dist/app/error/handleDuplicateError.js) | JavaScript | 23 | 0 | 1 | 24 |
| [dist/app/error/handleValidationError.js](/dist/app/error/handleValidationError.js) | JavaScript | 17 | 0 | 1 | 18 |
| [dist/app/error/handleZodError.js](/dist/app/error/handleZodError.js) | JavaScript | 17 | 0 | 1 | 18 |
| [dist/app/interface/error.js](/dist/app/interface/error.js) | JavaScript | 2 | 0 | 1 | 3 |
| [dist/app/middlewares/auth.js](/dist/app/middlewares/auth.js) | JavaScript | 56 | 4 | 1 | 61 |
| [dist/app/middlewares/globalErrorHandler.js](/dist/app/middlewares/globalErrorHandler.js) | JavaScript | 71 | 1 | 1 | 73 |
| [dist/app/middlewares/notFound.js](/dist/app/middlewares/notFound.js) | JavaScript | 16 | 1 | 1 | 18 |
| [dist/app/middlewares/validateRequest.js](/dist/app/middlewares/validateRequest.js) | JavaScript | 26 | 1 | 1 | 28 |
| [dist/app/middlewares/validateStripeWebhook.js](/dist/app/middlewares/validateStripeWebhook.js) | JavaScript | 19 | 0 | 1 | 20 |
| [dist/app/modules/Auth/Auth.controller.js](/dist/app/modules/Auth/Auth.controller.js) | JavaScript | 86 | 0 | 1 | 87 |
| [dist/app/modules/Auth/Auth.interface.js](/dist/app/modules/Auth/Auth.interface.js) | JavaScript | 2 | 0 | 1 | 3 |
| [dist/app/modules/Auth/Auth.route.js](/dist/app/modules/Auth/Auth.route.js) | JavaScript | 13 | 0 | 1 | 14 |
| [dist/app/modules/Auth/Auth.service.js](/dist/app/modules/Auth/Auth.service.js) | JavaScript | 82 | 2 | 1 | 85 |
| [dist/app/modules/Auth/Auth.utils.js](/dist/app/modules/Auth/Auth.utils.js) | JavaScript | 17 | 0 | 1 | 18 |
| [dist/app/modules/Auth/Auth.validation.js](/dist/app/modules/Auth/Auth.validation.js) | JavaScript | 32 | 0 | 1 | 33 |
| [dist/app/modules/Booking/Booking.constant.js](/dist/app/modules/Booking/Booking.constant.js) | JavaScript | 8 | 0 | 1 | 9 |
| [dist/app/modules/Booking/Booking.controller.js](/dist/app/modules/Booking/Booking.controller.js) | JavaScript | 130 | 0 | 1 | 131 |
| [dist/app/modules/Booking/Booking.interface.js](/dist/app/modules/Booking/Booking.interface.js) | JavaScript | 2 | 0 | 1 | 3 |
| [dist/app/modules/Booking/Booking.model.js](/dist/app/modules/Booking/Booking.model.js) | JavaScript | 40 | 0 | 1 | 41 |
| [dist/app/modules/Booking/Booking.route.js](/dist/app/modules/Booking/Booking.route.js) | JavaScript | 23 | 0 | 1 | 24 |
| [dist/app/modules/Booking/Booking.service.js](/dist/app/modules/Booking/Booking.service.js) | JavaScript | 300 | 23 | 1 | 324 |
| [dist/app/modules/Booking/Booking.validation.js](/dist/app/modules/Booking/Booking.validation.js) | JavaScript | 43 | 0 | 1 | 44 |
| [dist/app/modules/MyBooking/MyBooking.controller.js](/dist/app/modules/MyBooking/MyBooking.controller.js) | JavaScript | 31 | 0 | 1 | 32 |
| [dist/app/modules/MyBooking/MyBooking.route.js](/dist/app/modules/MyBooking/MyBooking.route.js) | JavaScript | 12 | 0 | 1 | 13 |
| [dist/app/modules/MyBooking/MyBooking.service.js](/dist/app/modules/MyBooking/MyBooking.service.js) | JavaScript | 36 | 1 | 1 | 38 |
| [dist/app/modules/Payment/Payment.controller.js](/dist/app/modules/Payment/Payment.controller.js) | JavaScript | 55 | 0 | 1 | 56 |
| [dist/app/modules/Payment/Payment.route.js](/dist/app/modules/Payment/Payment.route.js) | JavaScript | 13 | 1 | 1 | 15 |
| [dist/app/modules/Payment/Payment.service.js](/dist/app/modules/Payment/Payment.service.js) | JavaScript | 37 | 3 | 1 | 41 |
| [dist/app/modules/Payment/Payment.utils.js](/dist/app/modules/Payment/Payment.utils.js) | JavaScript | 66 | 0 | 1 | 67 |
| [dist/app/modules/Room/Room.controller.js](/dist/app/modules/Room/Room.controller.js) | JavaScript | 75 | 0 | 1 | 76 |
| [dist/app/modules/Room/Room.interface.js](/dist/app/modules/Room/Room.interface.js) | JavaScript | 2 | 0 | 1 | 3 |
| [dist/app/modules/Room/Room.model.js](/dist/app/modules/Room/Room.model.js) | JavaScript | 46 | 9 | 1 | 56 |
| [dist/app/modules/Room/Room.route.js](/dist/app/modules/Room/Room.route.js) | JavaScript | 18 | 0 | 1 | 19 |
| [dist/app/modules/Room/Room.service.js](/dist/app/modules/Room/Room.service.js) | JavaScript | 75 | 2 | 1 | 78 |
| [dist/app/modules/Room/Room.validation.js](/dist/app/modules/Room/Room.validation.js) | JavaScript | 30 | 0 | 1 | 31 |
| [dist/app/modules/Slots/Slots.controller.js](/dist/app/modules/Slots/Slots.controller.js) | JavaScript | 64 | 0 | 1 | 65 |
| [dist/app/modules/Slots/Slots.interface.js](/dist/app/modules/Slots/Slots.interface.js) | JavaScript | 2 | 0 | 1 | 3 |
| [dist/app/modules/Slots/Slots.model.js](/dist/app/modules/Slots/Slots.model.js) | JavaScript | 59 | 5 | 1 | 65 |
| [dist/app/modules/Slots/Slots.route.js](/dist/app/modules/Slots/Slots.route.js) | JavaScript | 17 | 0 | 1 | 18 |
| [dist/app/modules/Slots/Slots.service.js](/dist/app/modules/Slots/Slots.service.js) | JavaScript | 115 | 14 | 1 | 130 |
| [dist/app/modules/Slots/Slots.validation.js](/dist/app/modules/Slots/Slots.validation.js) | JavaScript | 42 | 0 | 1 | 43 |
| [dist/app/modules/User/User.controller.js](/dist/app/modules/User/User.controller.js) | JavaScript | 54 | 0 | 1 | 55 |
| [dist/app/modules/User/User.interface.js](/dist/app/modules/User/User.interface.js) | JavaScript | 2 | 0 | 1 | 3 |
| [dist/app/modules/User/User.model.js](/dist/app/modules/User/User.model.js) | JavaScript | 85 | 7 | 1 | 93 |
| [dist/app/modules/User/User.route.js](/dist/app/modules/User/User.route.js) | JavaScript | 14 | 0 | 1 | 15 |
| [dist/app/modules/User/User.service.js](/dist/app/modules/User/User.service.js) | JavaScript | 45 | 0 | 1 | 46 |
| [dist/app/modules/User/User.services.js](/dist/app/modules/User/User.services.js) | JavaScript | 36 | 0 | 1 | 37 |
| [dist/app/modules/User/User.validation.js](/dist/app/modules/User/User.validation.js) | JavaScript | 24 | 0 | 1 | 25 |
| [dist/app/routes/index.js](/dist/app/routes/index.js) | JavaScript | 46 | 0 | 1 | 47 |
| [dist/app/utils/catchAsync.js](/dist/app/utils/catchAsync.js) | JavaScript | 8 | 0 | 1 | 9 |
| [dist/app/utils/cronJobs.js](/dist/app/utils/cronJobs.js) | JavaScript | 43 | 2 | 1 | 46 |
| [dist/app/utils/sendResponse.js](/dist/app/utils/sendResponse.js) | JavaScript | 13 | 0 | 1 | 14 |
| [dist/server.js](/dist/server.js) | JavaScript | 51 | 0 | 1 | 52 |
| [eslint.config.mjs](/eslint.config.mjs) | JavaScript | 36 | 0 | 1 | 37 |
| [package.json](/package.json) | JSON | 51 | 0 | 1 | 52 |
| [public/confirmation.html](/public/confirmation.html) | HTML | 67 | 0 | 1 | 68 |
| [src/app.ts](/src/app.ts) | TypeScript | 28 | 1 | 7 | 36 |
| [src/app/builder/QueryBuilder.ts](/src/app/builder/QueryBuilder.ts) | TypeScript | 81 | 0 | 19 | 100 |
| [src/app/config/index.ts](/src/app/config/index.ts) | TypeScript | 16 | 0 | 2 | 18 |
| [src/app/error/AppError.ts](/src/app/error/AppError.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [src/app/error/handleCastError.ts](/src/app/error/handleCastError.ts) | TypeScript | 15 | 0 | 4 | 19 |
| [src/app/error/handleDuplicateError.ts](/src/app/error/handleDuplicateError.ts) | TypeScript | 22 | 1 | 6 | 29 |
| [src/app/error/handleValidationError.ts](/src/app/error/handleValidationError.ts) | TypeScript | 21 | 0 | 7 | 28 |
| [src/app/error/handleZodError.ts](/src/app/error/handleZodError.ts) | TypeScript | 17 | 0 | 5 | 22 |
| [src/app/interface/error.ts](/src/app/interface/error.ts) | TypeScript | 9 | 0 | 1 | 10 |
| [src/app/interface/index.d.ts](/src/app/interface/index.d.ts) | TypeScript | 8 | 0 | 1 | 9 |
| [src/app/middlewares/auth.ts](/src/app/middlewares/auth.ts) | TypeScript | 45 | 5 | 10 | 60 |
| [src/app/middlewares/globalErrorHandler.ts](/src/app/middlewares/globalErrorHandler.ts) | TypeScript | 63 | 3 | 6 | 72 |
| [src/app/middlewares/notFound.ts](/src/app/middlewares/notFound.ts) | TypeScript | 12 | 3 | 3 | 18 |
| [src/app/middlewares/validateRequest.ts](/src/app/middlewares/validateRequest.ts) | TypeScript | 12 | 1 | 2 | 15 |
| [src/app/modules/Auth/Auth.controller.ts](/src/app/modules/Auth/Auth.controller.ts) | TypeScript | 71 | 0 | 12 | 83 |
| [src/app/modules/Auth/Auth.interface.ts](/src/app/modules/Auth/Auth.interface.ts) | TypeScript | 4 | 0 | 7 | 11 |
| [src/app/modules/Auth/Auth.route.ts](/src/app/modules/Auth/Auth.route.ts) | TypeScript | 14 | 0 | 4 | 18 |
| [src/app/modules/Auth/Auth.service.ts](/src/app/modules/Auth/Auth.service.ts) | TypeScript | 92 | 2 | 19 | 113 |
| [src/app/modules/Auth/Auth.utils.ts](/src/app/modules/Auth/Auth.utils.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [src/app/modules/Auth/Auth.validation.ts](/src/app/modules/Auth/Auth.validation.ts) | TypeScript | 29 | 0 | 5 | 34 |
| [src/app/modules/Booking/Booking.constant.ts](/src/app/modules/Booking/Booking.constant.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [src/app/modules/Booking/Booking.controller.ts](/src/app/modules/Booking/Booking.controller.ts) | TypeScript | 115 | 0 | 16 | 131 |
| [src/app/modules/Booking/Booking.interface.ts](/src/app/modules/Booking/Booking.interface.ts) | TypeScript | 21 | 1 | 3 | 25 |
| [src/app/modules/Booking/Booking.model.ts](/src/app/modules/Booking/Booking.model.ts) | TypeScript | 27 | 0 | 6 | 33 |
| [src/app/modules/Booking/Booking.route.ts](/src/app/modules/Booking/Booking.route.ts) | TypeScript | 33 | 0 | 4 | 37 |
| [src/app/modules/Booking/Booking.service.ts](/src/app/modules/Booking/Booking.service.ts) | TypeScript | 332 | 23 | 76 | 431 |
| [src/app/modules/Booking/Booking.validation.ts](/src/app/modules/Booking/Booking.validation.ts) | TypeScript | 46 | 0 | 3 | 49 |
| [src/app/modules/MyBooking/MyBooking.controller.ts](/src/app/modules/MyBooking/MyBooking.controller.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [src/app/modules/MyBooking/MyBooking.route.ts](/src/app/modules/MyBooking/MyBooking.route.ts) | TypeScript | 6 | 0 | 4 | 10 |
| [src/app/modules/MyBooking/MyBooking.service.ts](/src/app/modules/MyBooking/MyBooking.service.ts) | TypeScript | 27 | 1 | 7 | 35 |
| [src/app/modules/Payment/Payment.controller.ts](/src/app/modules/Payment/Payment.controller.ts) | TypeScript | 47 | 0 | 9 | 56 |
| [src/app/modules/Payment/Payment.route.ts](/src/app/modules/Payment/Payment.route.ts) | TypeScript | 11 | 1 | 4 | 16 |
| [src/app/modules/Payment/Payment.service.ts](/src/app/modules/Payment/Payment.service.ts) | TypeScript | 27 | 3 | 8 | 38 |
| [src/app/modules/Payment/Payment.utils.ts](/src/app/modules/Payment/Payment.utils.ts) | TypeScript | 47 | 0 | 4 | 51 |
| [src/app/modules/Room/Room.controller.ts](/src/app/modules/Room/Room.controller.ts) | TypeScript | 60 | 0 | 14 | 74 |
| [src/app/modules/Room/Room.interface.ts](/src/app/modules/Room/Room.interface.ts) | TypeScript | 16 | 1 | 3 | 20 |
| [src/app/modules/Room/Room.model.ts](/src/app/modules/Room/Room.model.ts) | TypeScript | 29 | 9 | 7 | 45 |
| [src/app/modules/Room/Room.route.ts](/src/app/modules/Room/Room.route.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/app/modules/Room/Room.service.ts](/src/app/modules/Room/Room.service.ts) | TypeScript | 65 | 2 | 15 | 82 |
| [src/app/modules/Room/Room.validation.ts](/src/app/modules/Room/Room.validation.ts) | TypeScript | 27 | 0 | 4 | 31 |
| [src/app/modules/Slots/Slots.controller.ts](/src/app/modules/Slots/Slots.controller.ts) | TypeScript | 49 | 0 | 11 | 60 |
| [src/app/modules/Slots/Slots.interface.ts](/src/app/modules/Slots/Slots.interface.ts) | TypeScript | 18 | 1 | 4 | 23 |
| [src/app/modules/Slots/Slots.model.ts](/src/app/modules/Slots/Slots.model.ts) | TypeScript | 43 | 5 | 17 | 65 |
| [src/app/modules/Slots/Slots.route.ts](/src/app/modules/Slots/Slots.route.ts) | TypeScript | 11 | 0 | 4 | 15 |
| [src/app/modules/Slots/Slots.service.ts](/src/app/modules/Slots/Slots.service.ts) | TypeScript | 117 | 14 | 29 | 160 |
| [src/app/modules/Slots/Slots.validation.ts](/src/app/modules/Slots/Slots.validation.ts) | TypeScript | 57 | 0 | 3 | 60 |
| [src/app/modules/User/User.controller.ts](/src/app/modules/User/User.controller.ts) | TypeScript | 39 | 0 | 6 | 45 |
| [src/app/modules/User/User.interface.ts](/src/app/modules/User/User.interface.ts) | TypeScript | 18 | 1 | 4 | 23 |
| [src/app/modules/User/User.model.ts](/src/app/modules/User/User.model.ts) | TypeScript | 56 | 7 | 8 | 71 |
| [src/app/modules/User/User.route.ts](/src/app/modules/User/User.route.ts) | TypeScript | 8 | 0 | 3 | 11 |
| [src/app/modules/User/User.services.ts](/src/app/modules/User/User.services.ts) | TypeScript | 25 | 0 | 9 | 34 |
| [src/app/routes/index.ts](/src/app/routes/index.ts) | TypeScript | 41 | 0 | 5 | 46 |
| [src/app/utils/catchAsync.ts](/src/app/utils/catchAsync.ts) | TypeScript | 7 | 0 | 3 | 10 |
| [src/app/utils/cronJobs.ts](/src/app/utils/cronJobs.ts) | TypeScript | 26 | 2 | 4 | 32 |
| [src/app/utils/sendResponse.ts](/src/app/utils/sendResponse.ts) | TypeScript | 20 | 0 | 4 | 24 |
| [src/server.ts](/src/server.ts) | TypeScript | 34 | 0 | 7 | 41 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 14 | 89 | 9 | 112 |
| [vercel.json](/vercel.json) | JSON | 15 | 0 | 0 | 15 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)