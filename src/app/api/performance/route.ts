import { getPerformanceDataset } from "@/lib/performance.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    return Response.json(await getPerformanceDataset(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Unable to load Google Sheets performance data", error);
    return Response.json(
      { error: "Data spreadsheet belum dapat dimuat. Periksa akses Viewer service account dan environment variables." },
      { status: 503 }
    );
  }
}
