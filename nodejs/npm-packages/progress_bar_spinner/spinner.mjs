import ora from 'ora';
const spinner = ora('Loading something interesting...').start();
setTimeout(() => {
	spinner.color = 'blue';
    setTimeout(() => {
        spinner.stop();
        console.log('Done!');
    }, 3000);
}, 3000);