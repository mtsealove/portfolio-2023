declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        NEXT_PUBLIC_ENV: string;
    }
}

declare interface CareerDetail {
    title: string;
    contents: string[];
}

declare interface Career {
    companyImg: any;
    company: string;
    startAt: Date;
    endAt?: Date;
    role: string;
    items: CareerDetail[];
    roundIcon?: boolean;
}

declare interface SkillSet {
    title: string;
    skills: {
        high: Skill[]; // 업무에 사용
        middle: Skill[]; // 어느정도 사용
        low: Skill[]; // 보고 이해
    }
}

declare interface Skill {
    name: string;
    img?: any;
}

declare interface Project {
    id: number;
    title: string;
    thumbnail: string;
    summary: string;
    startAt: Date;
    endAt: Date;
    description: string;
    images: string[];
}

declare interface User {
    email: string;
    name: string;
}

declare interface Contact {
    id: number;
    email: string;
    content: string;
    createdAt: Date;
}
