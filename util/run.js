module.exports = task => {
  console.log(`Starting task ${task.name}...`)
  const start = performance.now();
  task();
  const end = performance.now();
  console.log(`Task ${task.name} completed in ${(end - start)} ms`)
}

