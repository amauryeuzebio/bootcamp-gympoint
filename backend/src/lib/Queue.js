import Bee from 'bee-queue';
import redisConfig from '../config/redis';

import RegistrationMail from '../app/jobs/RegistrationMail';
import AnswerOrderMail from '../app/jobs/AnswerOrderMail';

const jobs = [RegistrationMail, AnswerOrderMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // forEach diferente do map nao retorna nada so executa
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: Failed: ${err}`);
  }
}

export default new Queue();