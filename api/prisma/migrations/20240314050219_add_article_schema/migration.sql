-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "pubDate" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentSnippet" TEXT NOT NULL,
    "guid" TEXT NOT NULL,
    "isoDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
