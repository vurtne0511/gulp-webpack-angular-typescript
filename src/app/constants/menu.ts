
export const MENU = [
    { name: 'home', text: '首页', icon: 'icon-home', sref: 'dashboard', items: new Array<any>() },
    {
        name: 'edu', text: '教务', icon: 'icon-male-air-phone', items: [
            { name: 'edu-class-add', text: '建班', },
            { name: 'edu-class-pending', text: '开课' },
            {
                name: 'edu-class', text: '班级管理',
                items: [
                    { name: 'edu-class.detail.info', text: '基本信息' },
                    { name: 'edu-class.detail.statis', text: '班历' },
                    { name: 'edu-class.detail.student', text: '学生列表' },
                    { name: 'edu-class.detail.record', text: '班务记录' },
                    { name: 'edu-class.detail.lesson', text: '班务管理' }
                ]
            },
            { name: 'edu-class-opened', text: '续班' },
            {
                name: 'edu-student', text: '学生管理'
            },
            { name: 'edu-class-record', text: '班务记录' },
            { name: 'edu-notice', text: '公告' },
            { name: 'edu-schedule', text: '课程表' },
            { name: 'edu-class-search', text: '查班级' },
            { name: 'edu-class-archived', text: '已归档班级' }
        ]
    }
];