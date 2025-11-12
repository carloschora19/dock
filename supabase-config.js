// Configuración de Supabase
const SUPABASE_URL = 'https://bbwnldqwwswprkahxxlm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJid25sZHF3d3N3cHJrYWh4eGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MTY4NjIsImV4cCI6MjA3ODQ5Mjg2Mn0.vGwhXsGg_gHbGmNOEDZCs2fIK8vStQr_XePSuGANCAM';

// Inicializar el cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
