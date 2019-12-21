const { PerformanceObserver, performance } = require('perf_hooks')

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0]);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

module.exports = async task => {
  console.log(`Starting task ${task.name}...`)
  performance.mark('start');
  const res = task();
  if (res && res.hasOwnProperty('then')) await res;
  performance.mark('end');
  performance.measure(`${task.name}`, 'start', 'end')
}

