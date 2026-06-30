import mongoose, { Schema, Document } from "mongoose";


export interface IMensagem extends Document {

    remetente: string;
    destinatario: string;
    conteudo: string;
    data: Date;

}


const MensagemSchema = new Schema<IMensagem>({

    remetente: {
        type: String,
        required: true
    },


    destinatario: {
        type: String,
        required: true
    },


    conteudo: {
        type: String,
        required: true
    },


    data: {
        type: Date,
        default: Date.now
    }


});


export default mongoose.model<IMensagem>(
    "Mensagem",
    MensagemSchema
);