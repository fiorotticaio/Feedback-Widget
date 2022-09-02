export interface FeedbackCreateData {
    type: string
    comment: string
    screenshot?: string
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>; // toda função que retorna uma Promise, deve ser assíncrona
}