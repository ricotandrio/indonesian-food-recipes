export class Logging {
  static error(message: string) {
    console.log(`[${new Date().toISOString()}] [ERROR]\n{ message: ${message} }\n`);
  }

  static info(message: string) {
    console.log(`[${new Date().toISOString()}] [INFO]\n{ message: ${message} }\n`);
  }

  static warn(message: string) {
    console.log(`[${new Date().toISOString()}] [WARN]\n{ message: ${message} }\n`);
  }

  static debug(message: string) {
    console.log(`[${new Date().toISOString()}] [DEBUG]\n{ message: ${message} }\n`);
  }
}