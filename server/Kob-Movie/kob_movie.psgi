use strict;
use warnings;

use Kob::Movie;

my $app = Kob::Movie->apply_default_middlewares(Kob::Movie->psgi_app);
$app;

