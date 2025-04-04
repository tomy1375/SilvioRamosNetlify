-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(50) NOT NULL DEFAULT 'cliente',
    "empresa" VARCHAR(255),
    "telefono" VARCHAR(50),
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "archivo_url" VARCHAR(255) NOT NULL,
    "usuario_id" INTEGER,
    "fecha_subida" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "plano_id" INTEGER,
    "fecha" DATE NOT NULL,
    "hora" TIME(6) NOT NULL,

    CONSTRAINT "historial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "planos" ADD CONSTRAINT "planos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historial" ADD CONSTRAINT "historial_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "planos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historial" ADD CONSTRAINT "historial_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
