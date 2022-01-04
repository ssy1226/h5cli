"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const download_1 = tslib_1.__importDefault(require("download"));
const child_process_1 = require("child_process");
const ora_1 = tslib_1.__importDefault(require("ora"));
const spinner = ora_1.default();
const downloadOptions = {
    extract: true,
    strip: 1,
    mode: '666',
    headers: { 'PRIVATE-TOKEN': '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' },
    accept: 'application/zip',
};
// 模板zip下载路径
const downloadUrl = '';
/**
 * 重新命名当前项目名称
 */
const renameProName = async () => {
    const { proName } = await inquirer_1.default.prompt({
        type: 'input',
        name: 'proName',
        message: '请输入项目名称：',
    });
    if (!!proName) {
        return proName;
    }
    return await renameProName();
};
/**
 * 检测当前项目名是否合法
 * @param proName 项目名
 * @param options 运行时环境配置
 */
const checkVaildProName = async (proName, options) => {
    try {
        const cwd = options.cwd || process.cwd();
        const currentPath = path_1.default.resolve(cwd, proName);
        const proIsExist = fs_extra_1.default.pathExistsSync(currentPath);
        // 判断当前目录下是否已经存在命名项目
        if (proIsExist) {
            const { rename } = await inquirer_1.default.prompt({
                type: 'confirm',
                name: 'rename',
                message: '项目在当前目录下已经存在，请重新命名',
            });
            if (rename) {
                const newProName = await renameProName();
                return checkVaildProName(newProName, options);
            }
            else {
                return process.exit();
            }
        }
        return proName;
    }
    catch (e) {
        process.exit();
    }
};
const installPack = (projectPath) => {
    return new Promise((resolve, reject) => {
        console.log('projectPath', projectPath);
        const child_process = child_process_1.spawn('cd', [projectPath, '&&', 'npm', 'install'], { shell: true });
        child_process.on('close', data => {
            resolve(data);
            spinner.start('依赖安装完成');
        });
        child_process.on('error', error => {
            reject(error);
        });
    });
};
const projectInfo = async () => {
    const { desc } = await inquirer_1.default.prompt({
        type: 'input',
        name: 'desc',
        message: '请输入项目介绍：',
    });
    const { author } = await inquirer_1.default.prompt({
        type: 'input',
        name: 'author',
        message: '请输入项目Author：',
    });
    return {
        desc,
        author
    };
};
/**
 * 创建新项目
 */
const create = async (proName, options) => {
    const vaildProName = await checkVaildProName(proName, options);
    const { desc, author } = await projectInfo();
    const cwd = options.cwd || process.cwd();
    const currentPath = path_1.default.resolve(cwd, vaildProName);
    spinner.start('正在在下载模版');
    try {
        await fs_extra_1.default.mkdirSync(currentPath);
        await download_1.default(downloadUrl, currentPath, downloadOptions);
        spinner.succeed('下载成功');
        fs_extra_1.default.removeSync(`${currentPath}/.github`);
        const packFile = fs_extra_1.default.readFileSync(`${currentPath}/package.json`, 'utf8');
        const finalPackFile = packFile.replace(/\{\{name\}\}/g, proName).replace(/\{\{description\}\}/g, desc).replace(/\{\{author\}\}/g, author);
        fs_extra_1.default.writeFileSync(`${currentPath}/package.json`, finalPackFile);
        spinner.succeed('初始化完成');
    }
    catch (error) {
        console.log('error', error);
        spinner.fail('下载失败');
        await fs_extra_1.default.removeSync(currentPath);
        process.exit();
    }
};
exports.default = create;
